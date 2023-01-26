export type LoginDetails = {
    email: string;
    password: string;
};

export type OrderDetails = {
    senderName: string;
    receiverName: string;
    senderPhoneNumber: string;
    receiverPhoneNumber: string;
    token?: string;
};