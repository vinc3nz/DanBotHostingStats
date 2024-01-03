async function getNewKeyUS() {
    const serverRes = await axios({
        url: config.USProxy.url + "/api/tokens",
        method: "POST",
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            identity: config.USProxy.email,
            secret: config.USProxy.pass,
        },
    });
    return "Bearer " + serverRes.data.token;
}

const proxyServers = [
    {
        name: "US",
        getToken: getNewKeyUS,
        url: config.USProxy.url,
    },
];

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.find((r) => r.id === "898041751099539497")) return;

    if (!args[1]) {
        return message.reply(
            "Please provide a URL! WARNING: Do not use this command without checking the domain is not already linked! \n\n**This command should be used as a last resort. IF the domain is not linking**"
        );
    } else {
        const replyMsg = await message.reply("Trying to fix proxy... \n\n**This command should be used as a last resort. IF the domain is not linking**");

        let token;
        let using = false;
        let idOfProxy = null;

        replyMsg.edit(`Trying to fix proxy...\nAuthenticated, Looking for proxy...`);
        for (let i = 0; i < proxyServers.length; i++) {
            const proxyServer = proxyServers[i];

            message.reply(`Checking ${proxyServer.name}`);

            token = await proxyServer.getToken();

            const listOfUrls = await axios({
                url: proxyServer.url + "/api/nginx/proxy-hosts?expand=owner,access_list,certificate",
                method: "GET",
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            for (let index = 0; index < listOfUrls.data.length; index++) {
                const proxyObject = listOfUrls.data[index];
                if (proxyObject.domain_names.includes(args[1])) {
                    idOfProxy = proxyObject.id;
                    using = i;
                    i = proxyServers.length;
                }
            }
        }

        if (!idOfProxy) {
            replyMsg.edit(
                "Trying to fix proxy...\nAuthenticated\nDOMAIN_NOT_FOUND\nThis domain should work... did you do a typo?"
            );
        } else {
            replyMsg.edit(
                `Trying to fix proxy...\nAuthenticated\nFound domain ${idOfProxy} on ${proxyServers[using].name}, attempting to delete...`
            );

            const deletedObject = await axios({
                url: proxyServers[using].url + `/api/nginx/proxy-hosts/${idOfProxy}`,
                method: "DELETE",
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            if (deletedObject) {
                replyMsg.edit(
                    `Trying to fix proxy...\nAuthenticated\nFound domain ${idOfProxy} on ${proxyServers[using].name}, attempting to delete...\nDomain should now work, please ensure there is a DNS record pointing to the DBH proxy and also cloudflare proxy is disabled`
                );
            } else {
                replyMsg.edit(
                    `Trying to fix proxy...\nAuthenticated\nFound domain ${idOfProxy} on ${proxyServers[using].name}, attempting to delete...\nFailed to delete! Try again?`
                );
            }
        }
    }
};
