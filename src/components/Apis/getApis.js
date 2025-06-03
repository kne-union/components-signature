const getApis = options => {
  const { prefix } = Object.assign({}, { prefix: '/api/signature' }, options);

  return {
    list: {
      method: 'GET',
      url: `${prefix}/list`
    },
    create: {
      method: 'POST',
      url: `${prefix}/create`
    },
    update: {
      method: 'POST',
      url: `${prefix}/update`
    },
    remove: {
      method: 'POST',
      url: `${prefix}/remove`
    },
    verify: {
      method: 'POST',
      url: `${prefix}/verify`
    }
  };
};

export default getApis;
