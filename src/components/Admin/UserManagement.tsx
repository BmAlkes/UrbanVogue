import { useState } from "react"


const UserManagement = () => {
    const user =[
        {
            id: 1,
            name: "John Doe",
            email:"john@example.com",
            role:"admin",
        },
        {
            id: 2,
            name: "John Doe 2",
            email:"john2@example.com",
            role:"customer",
        }
    ]

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",// Default role
    })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        // Reset form data after submission
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
    };

    const handleRoleChange = (userId: number, newRole: string) => {
        // Handle role change logic here
        console.log(`User ID: ${userId}, New Role: ${newRole}`);
    };

const handleDeleteUser = (userId: number) => {
   
    if(window.confirm("Are you sure you want to delete this user?")) {
        // Handle delete user logic here
        console.log(`User with ID ${userId} deleted`);
    }

}
  return (
    <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6"> User Management</h2>
        {/* Add new user Form */}
        <div className="p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-4">Add new Users</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChangeForm} className="w-full p-2 border rounded required" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChangeForm} className="w-full p-2 border rounded required" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChangeForm} className="w-full p-2 border rounded required" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select name="role" value={formData.role} onChange={handleChangeForm} className="w-full p-2 border rounded">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Customer</button>
            </form>
        </div>
{/* User List */}
<div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="min-w-full text-left text-gray-500">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white text-sm">
            {user.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                        <select value={user.role} onChange={(e)=>handleRoleChange(user.id, e.target.value)} className="p-2 border rounded">
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </td>
                   
                    <td className="p-4">
                       
                        <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700" onClick={()=>handleDeleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    </div>
  )
}

export default UserManagement