function greeting(name, age, address) {
    if(age <= 16){
        console.log(`Hi, ${name}! Welcome to our kids' party, which will take place on November 15, 2024, at Kids Park, located at ${address}.`)
    }else{
        console.log(`Hi, ${name}! Welcome to our party, which will take place on November 15, 2024, at the park located at ${address}. Kids will be taken to a separate hall.`)
    }
}
module.exports = greeting;