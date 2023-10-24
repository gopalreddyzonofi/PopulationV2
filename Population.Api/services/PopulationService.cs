using System;
using System.Globalization;
using Population.Api.Services;
using Population.Data;
using Population.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Population.Api.services
{
    public class PopulationService : IPopulationService
    {
        private readonly IPopulationRepository _populationRepository;

        public PopulationService(IPopulationRepository populationRepository)
        {
            _populationRepository = populationRepository;
        }

        public PaginatedResponse<Population.Models.Population> GetAll(string searchTerm, string sortBy, string sortDirection, int pageNumber = 1, int pageSize = 10)
        {
            var populations =  _populationRepository.GetAll();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                populations =  populations.Where(p => p.Country != null && p.Country.Contains(searchTerm)
                || p.ID.ToString().Contains(searchTerm)
                ||  p.Year.ToString().Contains(searchTerm)
                || p.TotalFemale.ToString().Contains(searchTerm)
                || p.TotalMale.ToString().Contains(searchTerm));
            }

            populations = ApplySort(populations, sortBy, sortDirection);

            var totalCount = populations.Count();


            populations =  populations.Skip((pageNumber - 1) * pageSize).Take(pageSize);


            return new PaginatedResponse<Population.Models.Population>
            {
                Data = populations,
                TotalCount = totalCount
            };

        }

        private  IEnumerable<Population.Models.Population> ApplySort(IEnumerable<Models.Population> populations, string sortBy, string sortDirection)
        {
            if (!string.IsNullOrEmpty(sortBy) && !string.IsNullOrEmpty(sortDirection))
            {
                if (sortDirection == "desc")
                {
                    switch (sortBy)
                    {
                        case "country":
                            return populations.OrderByDescending(p => p.Country);
                        case "year":
                            return populations.OrderByDescending(p => p.Year);
                        case "id":
                            return populations.OrderByDescending(p => p.ID);
                        case "totalfemale":
                            return populations.OrderByDescending(p => p.TotalFemale);
                        case "totalmale":
                            return populations.OrderByDescending(p => p.TotalMale);

                        default:
                            return populations;
                    }
                }
                else
                {
                    switch (sortBy)
                    {
                        case "country":
                            return populations.OrderBy(p => p.Country);
                        case "year":
                            return populations.OrderBy(p => p.Year);
                        case "id":
                            return populations.OrderBy(p => p.ID);
                        case "totalfemale":
                            return populations.OrderBy(p => p.TotalFemale);
                        case "totalmale":
                            return populations.OrderBy(p => p.TotalMale);

                        default:
                            return populations;
                    }
                }
            }

            return populations;
        }

       
    }
}

