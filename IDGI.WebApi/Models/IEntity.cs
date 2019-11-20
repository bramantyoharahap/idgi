using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDGI.WebApi.Models
{
    interface IEntity
    {
        Guid ID { get; set; }
    }
}
