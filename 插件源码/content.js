var TARGET_TIME = 30; // 设置目标时长为30秒
const currentUrl = window.location.href;
const serverurl = 'https://api.skipads.com/query.php';
var id = "";
if (currentUrl.indexOf("://www.bilibili.com/video")) {
    id = extractBV(currentUrl);
}
else if (currentUrl.indexOf("://9ciyuan.com")) {
    id = eextractJoyfunID(currentUrl);
}
else {

}
async function skipAds(bv) {
        try {
            const response = await fetch(`https://api.skipads.net/query.php?id=${id}`);
            if (!response.ok) {
                console.error(`SkipAds: 请求失败，状态码: ${response.status}`);
                console.error(`SkiAds: 该版本为1.0.0 请确认是否为最新版本！ 官网: https://skipads.net`);
                return;
            }

            const data = await response.json();
            if (data && data.status === "success") {
                console.log("id:", data.id);
                const skipparts = JSON.parse(data.skipparts[0]);

                const video = document.querySelector('video');
                if (!video) {
                    console.log("未找到视频元素");
                    console.error(`SkiAds: 该版本为1.0.0 请确认是否为最新版本！ 官网: https://skipads.net`);
                    return;
                }

                for (const part of skipparts) {
                    console.log(`Start: ${part.start}, End: ${part.end}`);
                    const waitUntilTime = part.start;
                    const waitForVideo = await waitUntil(video, waitUntilTime);
                    if (waitForVideo) {
                        console.log(`视频已播放到 ${part.start} 秒！该处被标记为广告, 已自动为您跳过`);
                        video.currentTime = part.end; // 跳过广告
                        video.pause();
                    }
                }
            } else if (data) {
                console.error("SkipAds: 接口返回错误信息:", data.message);
                console.error(`SkiAds: 该版本为1.0.0 请确认是否为最新版本！ 官网: https://skipads.net`);

            } else {
                console.log("SkipAds: 未能获取数据");
                console.error(`SkiAds: 该版本为1.0.0 请确认是否为最新版本！ 官网: https://skipads.net`);

            }
        } catch (error) {
            console.error("SkipAds: 网络请求异常，无法获取接口数据。", error);
            console.error(`SkiAds: 该版本为1.0.0 请确认是否为最新版本！ 官网: https://skipads.net`);

        }
    }
}

function waitUntil(video, targetTime) {
    return new Promise(resolve => {
        const checkTime = setInterval(() => {
            if (Math.abs(video.currentTime - targetTime) <= 1) {
                clearInterval(checkTime);
                resolve(true);
            }
        }, 100); // 每100毫秒检查一次
    });
}

function extractBV(url) {
    const regex = /BV[a-zA-Z0-9]+/; 
    const match = url.match(regex); 
    return match ? match[0] : null; 
}

function extractJoyfunID(url) {
    const regex = /(?<=\/id\/)\d+\/sid\/\d+\/nid\/\d+\.html/; 
    const match = url.match(regex);
    return match ? match[0] : null; 
}

const intervalId = setInterval(checkVideoTime, 1000);

function checkVideoTime() {
    const video = document.querySelector('video');
    if (video) {
        console.log(`SkipAds:当前视频时间: ${video.currentTime} 秒`);
    }
}

