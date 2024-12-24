import pfpExample from "./assets/pfp-example.png"

function Card() {
    return(
        <div className="card">
            <img src={pfpExample} alt="pfp-example" />
            <h2>drift</h2>
            <p>waiting for the agi singularity</p>
        </div>
    )
}

export default Card;