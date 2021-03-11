const mongoose = require('mongoose');
const Campground = require("../models/campgrounds")
const cities = require("./cities")
const {descriptors,places} = require("./seedHelper")

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 300; i++)
    {
        const price = Math.floor(Math.random()*20) + 10
        
        const rand1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            author: "60139b3faaa06533d441703e",
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry : { "type" : "Point", "coordinates" : [cities[rand1000].longitude,cities[rand1000].latitude] },
            price,
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/nawabzainyy/image/upload/v1612194381/YelpCamp/w7mj47jnhbh0y73hggfu.jpg',
                  filename: 'YelpCamp/w7mj47jnhbh0y73hggfu'
                },
                {
                  
                  url: 'https://res.cloudinary.com/nawabzainyy/image/upload/v1612194384/YelpCamp/t091dwp01qtaznohwyue.jpg',
                  filename: 'YelpCamp/t091dwp01qtaznohwyue'
                }
              ],
            description :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus alias quod quis velit quasi nam, corrupti ut officia eligendi illo est repudiandae eius reprehenderit et voluptates, dolorem accusantium, optio hic? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, tempore. Laborum provident iusto, pariatur id dolorem neque quisquam voluptatem exercitationem illum nemo voluptates alias, officiis ut, sed expedita similique facilis."
           
        })
        await camp.save()

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
 


