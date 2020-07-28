大部分查询语句都可以使用聚合来实现：aggregate
具体使用this.ctx.model.Student.aggregate([{},{}....{}]);

// 只显示指定结果集
{
  $project: {
    sname: 1,
    ssex: 1,
    class: 1,
  }
}

// 查询条件在指定数组里面，或集合用 $in  不再某集合 使用$nin
$match : {}
    degree: {}
         $in: []

// 查询条件在区间 使用 $gt 和 $lt
$match : {}
    degree: {}
        $gt:
        $lt:

// 查询条件或 使用 $or + []
$match: {}
    $or: [ {},{}...{} ]
       
// 元素排序   -1降序  1升序  排序的方法可以是多个指标
$sort: {}
    class: -1 
    degree: 1

// 聚合计算查询数量  $count
{
  $match: {
    class: '95031',
  },
},
{
  $count: 'count',
},

// 聚合关联 多个表   使用$lookup + $unwind + $project
{
  $lookup: {},
  from: 'student'
  localField: 'sno',
  foreignField: 'sno',
  as: 'student',
},
{
  $unwind: '$student'
},
{
  $project: {
    sname: '$student.sname'
  },
},

// 限制查找个数 
$limit: 1


// 聚合查询平均值 
$group: {}
   _id: '$sno',
   avg: {
     $avg: '$degree',
   },
$max 是求最大值
把$max换成其他如：sum、avg、min。可实现求和、平均、最小值功能
