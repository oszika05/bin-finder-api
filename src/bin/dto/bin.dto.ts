
export interface BinDto {
    id: number;
    lat: number;
    long: number;
    type: {
        id: number;
        name: string;
    };
    isReported: boolean;
};
