using System;
namespace Population.Data
{
    public interface IPopulationRepository
    {
        IEnumerable<Population.Models.Population> GetAll();
    }
}

