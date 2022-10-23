export const handler = async (event: any) => {
  console.log('Handling movie list');
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  };
};
