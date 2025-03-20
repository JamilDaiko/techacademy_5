import CustomCard from "../components/custom/Card";


function Home() {
    return (
      <main className="max-w-[1220px] px-2.5 m-auto py-5  grid-cols-2 gap-5">
        
            <h1 className="text-5xl font-bold text-center text-black pb-6">my library</h1>

          <div className="flex justify-between flex-wrap w-full" >             
            <CustomCard/>
            <CustomCard/>
            <CustomCard/>
          </div>
          
      </main>
    );
}

export default Home;
