using IDGI.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDGI.WebApi.Repository
{
    interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Update(T obj);
        T Add(T obj);
        void Remove(string i);
        T GetById(string i);
    }
}
