export interface addLabTestCategory {
    name: string
}

export interface addLabTest {
    name: string,
    categoryId: string,
    price: string,
    sampleType: string,
    gender: string,
    ageGroup: string,
    reportDelivery: string,
    address: string,
    description: string,
    authorDetailsId: string
}

export interface productAdd {
    name: string;
    description: string;
    price: number | string;
    expiryOn: string;
    benefit: string;
    variant?: string;
    subCategoryId?: string;
    subcategoryId?: string;
    categoryId: string;
    childCategoryId: string;
    originId: string;
    brandId: string;
    ageGroupId: string;
    returnPolicy: string;
    stock?: number;
    file?: any;
}
