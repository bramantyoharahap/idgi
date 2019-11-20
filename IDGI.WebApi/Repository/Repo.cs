using IDGI.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace IDGI.WebApi.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbContext dbctx;
        private DbSet<T> dbset;

        public Repository()
        {
            dbctx = new AppDbContext();
            dbset = dbctx.Set<T>();
        }
        private void Save()
        {
            try
            {
                //dbctx.Database.ExecuteSqlCommand(string.Format("insert into supplier (code,name,city) values ('{0}')",));
                dbctx.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
        public T Add(T obj)
        {

            dbset.Add(obj);
            Save();
            return obj;
        }

        public IEnumerable<T> GetAll()
        {
            return dbset.ToList();
        }

        public T GetById(string i)
        {
            return dbset.Find(i);
        }

        public void Remove(string i)
        {
            T objToRemove = dbset.Find(i);
            if (dbctx.Entry(objToRemove).State == EntityState.Detached)
            {
                dbset.Attach(objToRemove);
            }
            dbset.Remove(objToRemove);
            Save();
        }

        public T Update(T obj)
        {
            dbset.Attach(obj);
            dbctx.Entry(obj).State = EntityState.Modified;
            Save();
            return obj;
        }
    }

    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("dbIDGI")
        {

        }
        DbSet<Supplier> Suppliers { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
    }
}