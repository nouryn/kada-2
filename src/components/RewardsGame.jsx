import { useState } from 'react'

const prizes = [
  { icon: '🌷', title: '10% off', code: 'TINY10', type: 'discount', value: 10, note: 'A little saving for your next pretend order.' },
  { icon: '📮', title: 'Free shipping', code: 'BUNNYPOST', type: 'shipping', note: 'Your parcel rides with the bunny post for free.' },
  { icon: '🎀', title: 'Free mystery item', code: 'TINYTRINKET', type: 'gift', note: 'A surprise treasure will join your pretend bag.' },
  { icon: '🍓', title: '15% off', code: 'BERRY15', type: 'discount', value: 15, note: 'A berry-sweet discount for your next pretend order.' },
]

const doors = ['🌙', '🍄', '🪻']

function RewardsGame({ activeVoucher, onWin, onOpenBag }) {
  const [open, setOpen] = useState(false)
  const [prize, setPrize] = useState(null)
  const [chosenDoor, setChosenDoor] = useState(null)

  const openGame = () => {
    setPrize(activeVoucher)
    setChosenDoor(null)
    setOpen(true)
  }

  const chooseDoor = (doorIndex) => {
    if (chosenDoor !== null) return
    const randomNumber = window.crypto.getRandomValues(new Uint32Array(1))[0]
    const wonPrize = prizes[randomNumber % prizes.length]
    setChosenDoor(doorIndex)
    window.setTimeout(() => {
      setPrize(wonPrize)
      onWin(wonPrize)
    }, 650)
  }

  const visitBag = () => {
    setOpen(false)
    onOpenBag()
  }

  return (
    <>
      <aside className="reward-banner" aria-label="Voucher game promotion">
        <span aria-hidden="true">✦</span>
        <p><strong>Play a tiny game, win a tiny treat!</strong> Pick a magical door for surprise vouchers.</p>
        <button onClick={openGame}>{activeVoucher ? 'Prize in my bag' : 'Play & collect'} <i>{activeVoucher ? 1 : 0}</i></button>
        <span aria-hidden="true">✦</span>
      </aside>

      {open && <div className="reward-layer" role="dialog" aria-modal="true" aria-labelledby="reward-title">
        <button className="reward-backdrop" onClick={() => setOpen(false)} aria-label="Close reward game" />
        <section className="reward-card">
          <button className="reward-close" onClick={() => setOpen(false)} aria-label="Close reward game">×</button>
          <span className="reward-eyebrow">The pocket-sized prize garden</span>
          <h2 id="reward-title">{activeVoucher ? 'Your prize is ready' : 'Choose a magical door'}</h2>
          <p>{activeVoucher ? 'It has already fluttered into your bag and will apply automatically at checkout.' : 'One of these tiny doors is holding a treat for you. Pick whichever one feels lucky.'}</p>

          {!prize && <div className="reward-doors" aria-label="Choose one of three prize doors">
            {doors.map((symbol, index) => <button
              key={symbol}
              className={chosenDoor === index ? 'chosen' : ''}
              disabled={chosenDoor !== null}
              onClick={() => chooseDoor(index)}
              aria-label={`Open magical door ${index + 1}`}
            >
              <span>{symbol}</span><i>{chosenDoor === index ? 'opening…' : `Door ${index + 1}`}</i>
            </button>)}
          </div>}

          {prize && <div className="reward-win" role="status" aria-live="polite">
            <div>{prize.icon}</div>
            <span>You found</span>
            <h3>{prize.title}</h3>
            <p>{prize.note}</p>
            <code>{prize.code}</code>
            <button onClick={visitBag}>See it in my bag →</button>
          </div>}

          {activeVoucher && <div className="voucher-wallet">
            <h3>Waiting in your bag <span>1</span></h3>
            <div><article>
              <span>{activeVoucher.icon}</span><p><strong>{activeVoucher.title}</strong><small>Auto-applied · one use only</small></p>
            </article></div>
          </div>}
          <small className="reward-disclaimer">One pretend prize at a time. It disappears after checkout.</small>
        </section>
      </div>}
    </>
  )
}

export default RewardsGame
