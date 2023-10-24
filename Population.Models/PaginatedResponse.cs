using System;
namespace Population.Models
{
    public class PaginatedResponse<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int TotalCount { get; set; }
    }
}

