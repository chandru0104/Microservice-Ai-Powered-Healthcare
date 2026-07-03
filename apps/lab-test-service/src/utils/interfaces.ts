export interface category {
    name:string,
    description:string
}


export interface addTest {
    name: string,
    categoryId: string,
    description: string,
    sampleType: string,
    gender: "Male"|"Female",
    ageGroup: string,
    authorDetailsId: string,
    reportDelivery: string,
    price: number
    address:string
    status:number
}