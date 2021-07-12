class ArticleModel {
  constructor(data, newId) {
    try {
      const newData = Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data;

      let id = 0;
      let title = '';
      let content = '';
      let author = 0;
      let createTime = '';
      let updateTime = '';

      const notEmptyData = Object.prototype.toString.call(newData) === '[object Object]' && Object.keys(newData).length > 0;

      if (notEmptyData) {
        id = newId || parseInt(data.id, 10);
        title = newData.title;
        content = newData.content;
        author = newData.author;
        createTime = newData.create_time;
        updateTime = newData.update_time;

        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createTime = createTime;
        if (updateTime) {
          this.updateTime = updateTime;
        }
      }
    } catch (error) {
      console.log('convert article data error: ', JSON.stringify(error));
    }
  }
}

module.exports = {
  ArticleModel,
};
