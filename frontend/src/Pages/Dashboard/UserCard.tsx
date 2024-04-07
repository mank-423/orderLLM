import Avatar from "../../Components/Avatar";

type UserCardProps = {
    name: string;
};

const UserCard: React.FC<UserCardProps> = ({ name }) => {
    return (
        <section className="bg-[#454444] hover:bg-[#F27B35]/80 transition duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden p-10 m-4">
            
            <div className="flex items-center justify-center ">
                <div className="lg:block md:block hidden">
                    <Avatar initials={name[0]} />
                </div>
                <div className="ml-4 text-white">
                    <p className="lg:text-sm md:text-sm text-[16px] font-semibold">{name}</p>
                </div>
            </div>

            <br />
            <div className="flex justify-center items-center">
                <button
                    className=" bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Delete
                </button>
            </div>

        </section>
    );
};

export default UserCard;
