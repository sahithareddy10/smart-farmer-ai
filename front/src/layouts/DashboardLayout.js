import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function DashboardLayout({children}){

return(

<div>

<Navbar/>

<div className="dashboard-container">

<Sidebar/>

<div className="dashboard-content">

{children}

</div>

</div>

</div>

)

}

export default DashboardLayout