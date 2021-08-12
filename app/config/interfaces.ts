export interface globalUser {
    role: string;
    userId: number;
    isCompany: boolean;
    companyId?: number;
}
export interface APIReturn {
    status: boolean,
    values?: any,
    message?: string
}
export interface WorkerData {
    process: {
        pid: number
    }
}
export interface ClusterData {
    fork: () => void,
    on: (type: string, callback: (worker: WorkerData, code: number, signal: string) => void) => void,
    isMaster: boolean
}
export interface RequestParsedQs { [key: string]: undefined | string | string[] | RequestParsedQs | RequestParsedQs[] }
export interface Response {
    status: (value: number) => {
        json: (data: APIReturn) => any;
    }
}