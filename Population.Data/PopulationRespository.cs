using System;
using CsvHelper;
using System.Globalization;

namespace Population.Data
{
	public class PopulationRespository : IPopulationRepository
	{
        private readonly string _csvFilePath;

        public PopulationRespository(string csvFilePath)
		{
            _csvFilePath = csvFilePath;
        }
        public IEnumerable<Population.Models.Population> GetAll()
        {

            var records = new CsvDataReader().ReadCsvData<Population.Models.Population>(_csvFilePath);
            return records;
        }
    }
}

