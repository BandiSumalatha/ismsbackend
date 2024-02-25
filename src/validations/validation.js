import UserRole from "../models/user/user.role.model.js";
import User from "../models/user/user.model.js";
import ImprestProduct from "../models/imprest_product/imprest.product.model.js"

export const isUserHasReferences = async (userId) => {
    const checkReferences = await Promise.all([
        UserRole.findOne({ where: { user_id: userId } }),
    ]);

    if (checkReferences.some((reference) => reference)) {
        return true;
    }

    return false;
}

export const isRoleHasReferences = async (roleId) => {
    const checkReferences = await UserRole.findOne({ where: { role_id: roleId } });

    if (checkReferences) {
        return true;
    }

    return false;
}

export const isImprestHasReferences = async (imprestId) => {

    const checkReferences = await Promise.all([
        UserRole.findOne({ where: { imprest_id: imprestId } }),
        ImprestProduct.findOne({ where: { imprest_id: imprestId } }),
    ]);

    if (checkReferences.some((reference) => reference)) {
        return true;
    }

    return false;
}

export const isProductHasReference = async (productId) => {
    const checkReferences = await ImprestProduct.findOne({ where: { product_id: productId } });

    if (checkReferences) {
        return true;
    }

    return false;
}

export const isValidEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
}

export const isValidUsername = (username) => {
    const usernamePattern = /^[A-Za-z0-9_]{3,20}$/;
    return usernamePattern.test(username);
}


export const isUserExisted = async (user) => {
    const existingUser = await User.findOne({
        where: { "user_name": user.user_name }
    });
    if (!existingUser) {
        return false;
    }
    return true;
};


export const isValidPassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /\d/;

    return uppercaseRegex.test(password) && specialCharRegex.test(password) && digitRegex.test(password);
};
