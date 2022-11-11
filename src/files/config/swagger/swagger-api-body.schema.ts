export function getApiBodySchema(fieldName: string) {
  return {
    schema: {
    type: 'object',
    properties: {
      files: {
          type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            }
        },
      },
    },
  }
};