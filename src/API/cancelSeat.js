import {BASEURLB} from '../constants/Url';
import {BASEURLP} from '../constants/Url';

export async function cancelSeat(ticket_id , email , seat_numbers , bus_id)
{
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        ticket_id : ticket_id,
        email : email,
        seat_numbers : seat_numbers,
        bus_id : bus_id,
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    
    try 
    {
        const response = await fetch(`${BASEURLP}/buses/delete_seats`,requestOptions);    
        
        if(response.status === 200)
        {
            const result = await response.json();
            return result;
        }
        else
        {
            console.log(response.status);
            return 'noData'; 
        }
    } 
    catch(error) 
    {
        console.log(err.message);
        return 'noData'; 
    }
}