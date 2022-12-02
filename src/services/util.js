// start ~ end - 1 범위의 배열 리턴
export const range = (start, end) => {
    const result = [];
    for(let i=start; i<end; i++)
        result.push(i);
    return result;
}

export const convertCategoryName = (categoryName) => {
    if (categoryName === "아이돌") {
        return "idol";
    }
    if (categoryName === "친구") {
        return "friend";
    }
    if (categoryName === "가족") {
        return "family";
    }
    if (categoryName === "썸/연애") {
        return "some/love";
    }
    if (categoryName === "학교") {
        return "school";
    }
    if (categoryName === "진로") {
        return "career";
    }
    if (categoryName === "스타일") {
        return "style";
    }
    if (categoryName === "공지사항") {
        return "notice";
    }
    return categoryName;
}