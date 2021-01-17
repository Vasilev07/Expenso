﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensoAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsExpense { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
