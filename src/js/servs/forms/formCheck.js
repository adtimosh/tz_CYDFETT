const formCheck = (_rows) => {
    return ((results) => {
        _rows.forEach((row) => {
            let ok = false;
            Array.from(row.getElementsByClassName('js-checkbox'))
                .forEach((cb) => (ok = ok ? ok : (cb.vals.on ? true : ok)));
            if (ok) { results.ok.push(row); } else { results.err.push(row); }
        })
        return results;
    })({ ok: [], err: [] })
}