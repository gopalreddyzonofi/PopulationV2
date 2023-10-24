
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace Population.Data
{
    public class CsvDataReader
    {

        public IEnumerable<T> ReadCsvData<T>(string path) where T : class
        {
            using (var reader = new StreamReader(path))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                BadDataFound = null
            }))
            {
                return csv.GetRecords<T>().ToList();
            }
        }
    }
}


