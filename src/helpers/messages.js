class BrandMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Failed Create Brand'
    static CREATE_SUCCESS_MESSAGE = 'Created Brand Successfully';
    static ID_NOTFOUND_MESSAGE = 'Brand Id not found';
    static REFERENCE_MESSAGE = 'Brand has references and cannot be deleted. has references and cannot be deleted.';
    static UPDATE_ERROR_MESSAGE = 'Failed to update Brand';
    static UPDATE_SUCCESS_MESSAGE = 'Updated Brand Successfully';
    static DELETE_ERROR_MESSAGE = 'Failed to delete Brand';
    static DELETE_SUCCESS_MESSAGE = 'Deleted Brand Successfully';
}

class ServerMessage {
    constructor() { }
    static ERROR_MESSAGE = 'Internal Server Error';
}

class RoleMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Failed Create Role'
    static CREATE_SUCCESS_MESSAGE = 'Created Role Successfully';
    static ID_NOTFOUND_MESSAGE = 'Role Id not found';
    static REFERENCE_MESSAGE = 'Role has references and cannot be deleted.';
    static UPDATE_ERROR_MESSAGE = 'Failed to update Role';
    static UPDATE_SUCCESS_MESSAGE = 'Updated Role Successfully';
    static DELETE_ERROR_MESSAGE = 'Failed to delete Role';
    static DELETE_SUCCESS_MESSAGE = 'Deleted Role Successfully';
    static FOREIGN_KEY_MESSAGE = 'hospital_id is required for the update.';
}

class UserMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'User creation failed!'
    static CREATE_SUCCESS_MESSAGE = 'User created successfully!';
    static ID_NOTFOUND_MESSAGE = 'User id not found!';
    static REFERENCE_MESSAGE = 'User has references and cannot be deleted!';
    static UPDATE_ERROR_MESSAGE = 'User updation failed!';
    static UPDATE_SUCCESS_MESSAGE = 'User updated successfully!';
    static DELETE_ERROR_MESSAGE = 'User delete failed!';
    static DELETE_SUCCESS_MESSAGE = 'User deleted successfully!';
}

class ImprestMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Imprest creation failed!'
    static CREATE_SUCCESS_MESSAGE = 'Imprest created successfully!';
    static ID_NOTFOUND_MESSAGE = 'Imprest id not found!';
    static REFERENCE_MESSAGE = 'Imprest has references and cannot be deleted!';
    static UPDATE_ERROR_MESSAGE = 'Imprest updation failed!';
    static UPDATE_SUCCESS_MESSAGE = 'Imprest updated successfully!';
    static DELETE_ERROR_MESSAGE = 'Imprest delete failed!';
    static DELETE_SUCCESS_MESSAGE = 'Imprest deleted successfully!';
}
class ProductMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Product creation failed!'
    static CREATE_SUCCESS_MESSAGE = 'Product created successfully!';
    static ID_NOTFOUND_MESSAGE = 'Product id not found!';
    static REFERENCE_MESSAGE = 'Product has references and cannot be deleted!';
    static UPDATE_ERROR_MESSAGE = 'Product updation failed!';
    static UPDATE_SUCCESS_MESSAGE = 'Product updated successfully!';
    static DELETE_ERROR_MESSAGE = 'Product delete failed!';
    static DELETE_SUCCESS_MESSAGE = 'Product deleted successfully!';
}

class ImprestProductMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'ImprestProduct creation failed!'
    static CREATE_SUCCESS_MESSAGE = 'ImprestProduct created successfully!';
    static ID_NOTFOUND_MESSAGE = 'ImprestProduct id not found!';
    static REFERENCE_MESSAGE = 'ImprestProduct has references and cannot be deleted!';
    static UPDATE_ERROR_MESSAGE = 'ImprestProduct updation failed!';
    static UPDATE_SUCCESS_MESSAGE = 'ImprestProduct updated successfully!';
    static DELETE_ERROR_MESSAGE = 'ImprestProduct delete failed!';
    static DELETE_SUCCESS_MESSAGE = 'ImprestProduct deleted successfully!';
    static INVALID_STOCK_MESSAGE = "Invalid stock values. Please ensure available stock is less than max stock, and max stock is greater than min stock."
}

class PurchaseProductMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Product Purchase failed!'
    static CREATE_SUCCESS_MESSAGE = 'Product Purchase done successfully!'
}

class NotificationMessage {
    constructor() {
    }
    static CREATE_ERROR_MESSAGE = 'Failed to send the Notification, Please check the serial number'
    static CREATE_SUCCESS_MESSAGE = 'Notification sent successfully!'
    static ALERT_FAILED_MESSAGE = "Failed to resolve the Alert"
    static ALERT_SUCCESS_MESSAGE = "Camera Alert Resolved"
    static ALERT_ERROR_MESSAGE_CREATE = "Failed to sent Motion Alerts"
}

export default {
    BrandMessage,
    ServerMessage,
    RoleMessage,
    UserMessage,
    ImprestMessage,
    ProductMessage,
    ImprestProductMessage,
    PurchaseProductMessage,
    NotificationMessage
};