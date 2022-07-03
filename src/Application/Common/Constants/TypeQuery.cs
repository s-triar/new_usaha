using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Common.Constants;

public static class TypeQuery
{
    public static class Prop
    {
        public static readonly string ID = "ID";
        public static readonly string CODE = "CODE";
    }

    public static class Group
    {
        public static readonly string LOWEST_PRICE = "LOWEST_PRICE";
        public static readonly string HIGHEST_PRICE = "HIGHEST_PRICE";
        public static readonly string NEAREST = "NEAREST";
        public static readonly string FARTHEST = "FARTHEST";
        public static readonly string GLOBAL = "GLOBAL";
        public static readonly string LOCAL = "LOCAL";
    }


}
