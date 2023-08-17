import config from "../config/index.js";
import db from "../model/index.js";
import RoleModel from "../model/role.model.js";

const connectToDatabase = async () => {
  try {
    await db.mongoose.connect(
      `mongodb://${config.HOST}:${config.DBPORT}/${config.DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("[database] connected to mongodb");
    await initializeRoles();
  } catch (error) {
    console.error("[database] connection error", error);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
};

const initializeRoles = async () => {
  try {
    const count = await RoleModel.estimatedDocumentCount();
    if (count === 0) {
      const rolesToCreate = ["user", "moderator", "admin"];
      for (const roleName of rolesToCreate) {
        await createRoleIfNotExists(roleName);
      }
      console.log("[model] created roles successfully");
    }
  } catch (error) {
    console.error("[model] role initialization error", error);
  }
};

const createRoleIfNotExists = async (roleName) => {
  try {
    const existingRole = await RoleModel.findOne({ name: roleName });
    if (!existingRole) {
      await RoleModel.create({ name: roleName });
    }
  } catch (error) {
    console.error(`[model] could not save role ${roleName}`, error);
  }
};

export default connectToDatabase;
