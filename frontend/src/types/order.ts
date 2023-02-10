type Order = {
    id?: string;
    customerId: string;
    website: string;
    startTime: Date;
    endTime: Date;
    description: string;
    fileIds: string[];
    createdBy: string;
}

export default Order;