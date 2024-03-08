"use client"

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return(
        // 1. 여기서 보면 기존의 const로 선언해서 return 밖에서 했는데 바로 form 제출 안에서 함수 로직을 시작하게 됨 
        // 2. target은 현재 폼 테그를 의미함 그래서 폼 테그 안의 title의 값을 담아둔다.
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
            .then(res => res.json())
            .then(result =>{
                console.log(result);
                // 3. 여기서는 내가 작성한 글로 redirect를 해준다는 의미를 가짐
                // 4. 아니면 내가 작성한 글로 가도 되고 아니면 그냥 list로 던져도 되고 이런 의미를 가짐 
                // 5. refresh를 사용해서 즉각적인 ui를 보여줄 수 있게 반영 
                // 6. 하지만 불러오는 list에서도 추가 작업을 해줘야 한다.
                const lastid = result.id;
                router.push(`/read/${lastid}`);
                router.refresh();
            })
            .catch(error => console.error('Fetch Error:', error));
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
        
    )
}