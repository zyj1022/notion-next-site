import { NotionAPI } from 'notion-client';
import { getTextContent, getDateValue, idToUuid } from 'notion-utils';
import SITE from '../site.config';

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts({ includePages = false }) {
  let id = SITE.notionPageId;
  const authToken = SITE.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  const response = await api.getPage(id);

  id = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  // console.log('getAllPosts---collectionQuery', collectionQuery);

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties = (await getPageProperties(id, block, schema)) || null;

      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString();
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false;

      data.push(properties);
    }
    // console.log('getAllPosts===pageIds', pageIds)
    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages });

    // Sort by date
    if (SITE.sortByDate) {
      posts.sort((a, b) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime);
        const dateB = new Date(b?.date?.start_date || b.createdTime);
        return dateB - dateA;
      });
    }
    // console.log('getAllPosts===post', posts)
    return posts;
  }
}

export async function getPageProperties(id, block, schema, authToken) {
  const api = new NotionAPI({ authToken });
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ['date', 'select', 'multi_select', 'person'];
  const properties = {};
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val);
          delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(',');
          }
          break;
        }
        case 'person': {
          const rawUsers = val.flat();
          const users = [];
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0];
              const res = await api.getUsers(userId);
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              };
              users.push(user);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }
  return properties;
}

export async function getPostBlocks(id) {
  const authToken = SITE.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  const pageBlock = await api.getPage(id);
  return pageBlock;
}

export function getAllPageIds(collectionQuery, viewId) {
  const views = Object.values(collectionQuery)[0];
  // console.log('getAllPageIds---', views);
  let pageIds = [];
  if (viewId) {
    const vId = idToUuid(viewId);
    pageIds = views[vId]?.collection_group_results?.blockIds;
  } else {
    const pageSet = new Set();
    Object.values(views).forEach((view) => {
      view?.collection_group_results?.blockIds?.forEach((id) =>
        pageSet.add(id)
      );
    });
    pageIds = [...pageSet];
  }
  return pageIds;
}

const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export function filterPublishedPosts({ posts, includePages }) {
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) =>
      includePages
        ? post?.type?.[0] === 'Post' || post?.type?.[0] === 'Page'
        : post?.type?.[0] === 'Post'
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        postDate < tomorrow
      );
    });
  return publishedPosts;
}

export function formatDate(date, local) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const res = d.toLocaleDateString(local, options);
  return local.slice(0, 2).toLowerCase() === 'zh'
    ? res.replace('年', ' 年 ').replace('月', ' 月 ').replace('日', ' 日')
    : res;
}

export function getMetadata(rawMetadata) {
  const metadata = {
    locked: rawMetadata?.format?.block_locked,
    page_full_width: rawMetadata?.format?.page_full_width,
    page_font: rawMetadata?.format?.page_font,
    page_small_text: rawMetadata?.format?.page_small_text,
    created_time: rawMetadata.created_time,
    last_edited_time: rawMetadata.last_edited_time
  };
  return metadata;
}

export function getAllTagsFromPosts(posts) {
  const taggedPosts = posts.filter((post) => post?.tags);
  const tags = [...taggedPosts.map((p) => p.tags).flat()];
  const tagObj = {};
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++;
    } else {
      tagObj[tag] = 1;
    }
  });
  return tagObj;
}
