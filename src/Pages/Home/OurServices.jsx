import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const OurServices = () => {
    const [services, setServices] = useState([])
    const [asc, setAsc] = useState(true)
    const [search, setSearch] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        const searchText = e.target.search.value
        // console.log(searchText);
        setSearch(searchText)
    }

    useEffect(() => {
        fetch(`http://localhost:5000/servicess?sort=${asc ? 'asc' : 'desc'}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                setServices(data)
                console.log(data);
            })
    }, [asc, search])
    return (
        <div className="text-center space-y-6">
            <div className="text-center">
                <h3 className="text-3xl text-orange-500">Servicess</h3>
                <h2 className="text-5xl">Our Servicess Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable. </p>
            </div>
            <form onSubmit={handleSearch}>
                <input type="text" name="search" className="input bg-black text-white " />
                <input type="submit" value="Search" className="btn"/>
            </form>
            <button onClick={() => setAsc(!asc)} className="btn btn-primary">{asc ? 'Price: High to Low' : 'Price: Low to High'}</button>
            <div className="grid grid-cols-3 gap-6">
                {services.map(service => <div key={service._id} className="card w-80 bg-base-100 shadow-xl">
                    <figure><img src={service.img} alt="Shoes" /></figure>
                    <div className="card-body text-start">
                        <h2 className="card-title">{service.title}</h2>
                        <p className="text-xl font-bold text-orange-400">{service.price}</p>
                    </div>
                    <div className="card-actions">
                        <Link to={`checkout/${service._id}`}><button className="btn">Book now</button></Link>
                    </div>
                </div>)}
            </div>
            <button className="btn btn-outline btn-error">More Services</button>
        </div>
    );
};

export default OurServices;