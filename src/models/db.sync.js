import sequelize from '../../src/config/db.config.js';
import GenericName from "./generic_name/generic.name.model.js";
import Hospital from "./hospital/hospital.model.js";
import User from "./user/user.model.js";
import Imprest from "./imprest/imprest.model.js";
import UserRole from "./user/user.role.model.js";
import Role from "./user/role.model.js";
import ProductForm from "./product_form/product.form.model.js";
import Brand from "./brand/brand.model.js";
import pack_unit_of_measure from "./pack_unit_of_measure/pack.uom.model.js"
import unit_of_measure from "./unit_of_measure/unitof.measure.model.js";
import Product from "./product/product.model.js"
import Purchase from "./purchase/purchase.model.js";
import Email from './email/email.model.js';
import ObjectDetection from './objectDetection/objectDetection.model.js'

function Sync() {
    sequelize.sync({ force: false });
}

export default Sync;