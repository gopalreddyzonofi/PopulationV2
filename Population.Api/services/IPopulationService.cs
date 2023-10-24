using System;
using Population.Models;

namespace Population.Api.Services
{
    public interface IPopulationService
    {
        PaginatedResponse<Population.Models.Population> GetAll(string searchTerm, string sortBy, string sortDirection, int pageNumber, int pageSize );

        bool Update(Population.Models.Population updatedPopulation);

    }
}
