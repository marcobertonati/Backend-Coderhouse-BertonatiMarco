class DTOmemory {
  constructor(data) {
    this.data = data;
    this.id = process.pid + String(new Date().getMilliseconds());
    this.FyH = new Date().toISOString();
  }
}

module.exports = DTOmemory;
