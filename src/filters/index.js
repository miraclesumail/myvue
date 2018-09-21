import * as _  from 'lodash'

const getRepeatCount = (words) => {
       let word = words.replace(/\s+/g,""), count = 0;
       let statistic =  _.split(word, '').reduce((a,b) => {
          if(a[b]){
              a[b] = a[b] + 1
          }else{
              a[b] = 1
          }
          return a
       }, {})
       console.log(statistic)
       for(const [key,value] of Object.entries(statistic)){
           if(value > 1)
              count += value
       }

       return count
}

export default {
    getRepeatCount
}