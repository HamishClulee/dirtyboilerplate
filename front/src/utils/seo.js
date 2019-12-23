export const overwritemetas = (meta, next) => {
    // added as a default to avoid having to specify for all existing routes
    if (!meta.noindex) {
        meta.noindex = false;
    }

    // description and title meta tagging
    const des = document.getElementById("__meta_description")
    const title = document.getElementsByTagName("title")[0];

    title.text = meta.title;
    des.content = meta.description;

    // add the noindex meta tag if requested, if not ensure any existing noindex tags are removed
    // and break if none exist
    if (meta.noindex) {
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex";
        document.getElementsByTagName("head")[0].appendChild(robots);
    } else {
        try {
            const metas = document.getElementsByTagName("meta");
            for (let i = 0; i < metas.length; i++) {
                if (metas[i] && metas[i].parentNode && metas[i].name === "robots") {
                    metas[i].parentNode.removeChild(metas[i]);
                }
            }
        } catch (e) {
            // suppress any console errors
            if (next) {
                next();
            }
        }
    }
    if (next) {
        next();
    }
};
