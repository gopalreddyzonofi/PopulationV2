
export type population = {
    id: number;
    country?: string;
    year: number;
    totalMale: number;
    totalFemale: number;
    averageMalePopulation: number;
    averageFemalePopulation: number;
}

export type populationSummary = {
    averageTotalMale: number;
    averageTotalFemale: number;
}

export type populationSummaryDTO = {
    data: population[];
    totalCount: number;
}





export function fetchData(searchTerm: string, sortBy: string, sortDirection: string, pageNumber: number): Promise<populationSummaryDTO> {
    const dataUrl =
        ` https://localhost:7185/Population?searchTerm=${searchTerm}&sortBy=${sortBy}&sortDirection=${sortDirection}&pageNumber=${pageNumber}`;
    return fetch(dataUrl)
        .then((r) => r.json())
}
