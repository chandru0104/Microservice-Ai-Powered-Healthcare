export interface addLabTestCategory {
    name:string
}

export interface addLabTest{
    id:string,
    name:string
}

export interface productAdd{
      name:string,
      description:string,
      price:number,
      expiryOn:string,
      benefit:string,
      variant:string,
      subcategoryId:string,
      categoryId:string,
      childCategoryId:string,
      originId:string,
      brandId:string,
      ageGroupId:string,
      returnPolicy:string,
      stock:number
}