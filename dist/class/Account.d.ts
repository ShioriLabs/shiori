interface Account {
    ref: number;
    ts: number;
    data: {
        user: string;
        balance: number;
    };
}
export default Account;
