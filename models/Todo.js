const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      primary: true,
      type: "uuid",
    },
    title: {
      type: "varchar",
      length: 255,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      name: "updated_at",
      type: "timestamp",
      updateDate: true,
    },
  },
});
