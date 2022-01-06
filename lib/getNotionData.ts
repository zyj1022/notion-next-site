import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_cL5uaoWNe3fTHlBw98j72iVYboO2ba0MMDXtXx1NTx8'
});

export const getNotionData = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    // Sort posts in descending order based on the Date column.
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ]
  });
  console.log('response--', response);
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50
  });
  return response.results;
};
