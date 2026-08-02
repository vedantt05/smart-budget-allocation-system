import mongoose from "mongoose";

/* ==========================================
   ITEM SCHEMA
========================================== */

const itemSchema = new mongoose.Schema({

    name:{

        type:String,

        required:true,

        trim:true

    },

    cost:{

        type:Number,

        required:true

    },

    benefit:{

        type:Number,

        required:true

    }

});

/* ==========================================
   PROJECT SCHEMA
========================================== */

const projectSchema = new mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },

    projectName:{

        type:String,

        required:true,

        trim:true

    },

    budget:{

        type:Number,

        required:true

    },

    items:[itemSchema],

    selectedItems:[itemSchema],

    totalCost:{

        type:Number,

        default:0

    },

    totalBenefit:{

        type:Number,

        default:0

    },

    remainingBudget:{

        type:Number,

        default:0

    },

    algorithm:{

        type:String,

        default:"0/1 Knapsack"

    },

    createdAt:{

        type:Date,

        default:Date.now

    }

});

const Project = mongoose.model(

"Project",

projectSchema

);

export default Project;