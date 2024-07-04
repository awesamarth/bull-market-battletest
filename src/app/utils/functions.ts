export const callApi = async(address:`0x${string}` | undefined, level:Number)=>{
    try {
      const response = await fetch("/user-levels/api", {
        method: "POST",
        body: JSON.stringify({level:level, walletAddress:address})
      });

      if (response.ok) {
        console.log("call successful");
      } else {
        console.error("Failed");

      }
    } catch (error) {
      console.log(address)
      console.log({level:1, walletAddress:address})
      console.error("Error occurred during API call:", error);

    }
  }

export const eligible = async(address:`0x${string}` | undefined, level:Number)=>{
    try {
      const response = await fetch("/user-levels/api", {
        method: "GET",
        body: JSON.stringify({level:level, walletAddress:address})
      });

      if (response.ok) {
        console.log("call successful");
        const theResponse = await response.json()
        if(theResponse.result==0){
            return false
        }
        else{
            return true
        }
      } else {
        console.error("Failed");

      }
    } catch (error) {
      console.log(address)
      console.log({level:1, walletAddress:address})
      console.error("Error occurred during API call:", error);

    }
  }
