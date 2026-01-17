import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
} from "recharts";


export default function VoteChart({ data }) {
 return (
   <div className="bg-white p-4 rounded shadow mb-4">
     <h2 className="font-bold mb-2">Reactions per Post</h2>
     <ResponsiveContainer width="100%" height={250}>
       <BarChart data={data}>
         <XAxis dataKey="title" />
         <YAxis />
         <Tooltip />
         <Bar dataKey="likes" fill="#16A34A" />
         <Bar dataKey="dislikes" fill="#DC2626" />
       </BarChart>
     </ResponsiveContainer>
   </div>
 );
}
